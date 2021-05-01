import { useEffect } from 'react';

import { mapValues } from 'lodash';

import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';

import * as queryString from 'query-string';
import produce from 'immer';

/* components */
import { MainLayout } from '../../components/main_layout/main_layout';
import FilterContainer from '../../components/filter_container/filter_container';
import PortfolioCardContainer from '../../components/single_card/single_card';
import { Pagination } from '../../components/pagination/Pagination';
import Custom404 from '../404';
/* global state */
import {
    setFilterItems,
    setSearchUrl,
    setPostData,
    addCheckedParam,
    removeCheckedParam,
    setCategoriesData,
    setTagsData,
} from '../../store/reducers/portfolioPageReducer';
import { initializeStore } from '../../store/store';
/* styles */
import style from './portfolio.module.scss';

function Portfolio({ page, totalPages, error }) {
    const router = useRouter();

    let currentPage = router.query ? router.query.page : 1;

    if (error) {
        return <Custom404 />;
    }

    const dispatch = useDispatch();
    const cleanUrlState = useSelector((state) => state.portfolio.url);
    const posts_with_cat = useSelector((state) => state.portfolio.posts);
    const filter_items = useSelector((state) => state.portfolio.filter_items);

    /* Функция достает из query роутера параметры поиска и отправляем их в state */
    const preventSearchUrl = () => {
        let url = router.query;

        let cleanUrl = mapValues(url, function (value, key) {
            /* На каждой итерации объекта проверяем значение ключа, slug нужен для корректной работы роутера*/
            if (key === 'slug' || key === 'page') {
                return value;
            } else {
                /* Создаем объект, где ключ это имя фильтра, а значение массив значений фильтра */
                let arrayValue = value.split('.');
                let arrayValueNumber = arrayValue.map((value) => Number(value));
                return arrayValueNumber;
            }
        });

        dispatch(setSearchUrl(cleanUrl));
    };

    useEffect(() => {
        /* Преобразование урла роутера нужно на стадии монтирования компонента, чтобы можно было получить данные из урла и синхронизировать с UI. Т.е. пользователь переходит по ссылке, которая уже имеет значения фильтра, и в UI нужные checkbox будут иметь значение true */
        preventSearchUrl();
    }, [dispatch]);

    useEffect(() => {
        let newFilterItems = produce(filter_items, (draftItems) => {
            mapValues(draftItems, function (value, key) {
                for (let keyUrl in cleanUrlState) {
                    if (keyUrl === key) {
                        value.map((item_value) => {
                            if (cleanUrlState[keyUrl].includes(item_value.id)) {
                                item_value.isChecked = true;
                            } else {
                                item_value.isChecked = false;
                            }
                            return item_value;
                        });
                    }
                }
                return value;
            });
        });
        dispatch(setFilterItems(newFilterItems));
    }, [cleanUrlState]);

    const onChangeHandler = (itemId, isChecked, taxonomy_key) => {
        let newCleanUrlState;
        if (isChecked === true) {
            newCleanUrlState = produce(cleanUrlState, (draftUrlState) => {
                draftUrlState[taxonomy_key] = draftUrlState[taxonomy_key].filter(
                    (urlItemId) => urlItemId !== itemId
                );
            });
            dispatch(removeCheckedParam(newCleanUrlState));
        } else {
            newCleanUrlState = produce(cleanUrlState, (draftUrl) => {
                if (cleanUrlState.hasOwnProperty(taxonomy_key)) {
                    draftUrl[taxonomy_key].push(itemId);
                } else {
                    draftUrl[taxonomy_key] = [itemId];
                }
            });
            dispatch(addCheckedParam(newCleanUrlState));
        }

        let pushUrl = produce(newCleanUrlState, (draftUrl) => {
            draftUrl = mapValues(draftUrl, function (value, key) {
                if (key === 'slug') {
                    delete draftUrl[key];
                    /*  return value; */
                } else if (key === 'page') {
                    delete draftUrl[key];
                } else {
                    if (value.length > 0) {
                        let valueString = value.join('.');
                        draftUrl[key] = valueString;
                    } else {
                        delete draftUrl[key];
                    }
                }
            });
        });

        router.push({
            pathname: `/${router.query.slug}`,
            query: pushUrl,
        });
    };
    return (
        <MainLayout
            title={page.meta_title}
            meta_descr={page.meta_descr}
            meta_keywords={page.meta_keyw}
            menu_btn_color="#000">
            <section className={style.page_wrapper}>
                <h2 className={style.page_title}>портфолио</h2>
                <div className="container">
                    <div className={style.note_wrapper}>
                        <div className={style.note_perview}>{page.sub_title}</div>
                        <div
                            className={style.note_text}
                            dangerouslySetInnerHTML={{ __html: page.note_text }}></div>
                    </div>
                    <div className={style.filter_wrapper}>
                        <FilterContainer
                            title={'Категории работ'}
                            filter_items={filter_items.categories}
                            taxonomy_key={'categories'}
                            onChangeHandler={onChangeHandler}
                        />
                        {/* tags filter */}
                        <FilterContainer
                            title={'Применяемые технологии'}
                            filter_items={filter_items.tags}
                            taxonomy_key={'tags'}
                            onChangeHandler={onChangeHandler}
                        />
                    </div>
                    <PortfolioCardContainer
                        slug={router.query.slug}
                        posts={posts_with_cat}
                    />
                    <Pagination
                        slug={'portfolio'}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        searchQuery={cleanUrlState}
                    />
                </div>
            </section>
        </MainLayout>
    );
}

export default Portfolio;

export async function getServerSideProps({ query }) {
    let formatedSeacrQuery = produce(query, (draftSearchQuery) => {
        draftSearchQuery = mapValues(draftSearchQuery, function (value, key) {
            if (key === 'slug' || key === 'page') {
                delete draftSearchQuery[key];
            } else {
                let arrayValue = value.split('.');
                draftSearchQuery[key] = arrayValue;
            }
        });
    });

    let urlSearchQuery = queryString.stringify(formatedSeacrQuery, {
        arrayFormat: 'separator',
        arrayFormatSeparator: ',',
    });

    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;
    try {
        let totalPages = 1;

        const [posts, categories, tags, page] = await Promise.all([
            fetch(
                `${process.env.api_key}/posts?per_page=8&page=${
                    query.page ? Number(query.page.replace(/page_/, '')) : 1
                }&${urlSearchQuery}`
            ).then((res) => {
                totalPages = res.headers.get('X-WP-TotalPages');
                return res;
            }),
            fetch(`${process.env.api_key}/categories`),
            fetch(`${process.env.api_key}/tags`),
            fetch(`${process.env.api_key}/pages?slug=${query.slug}`),
        ])
            .then((responses) => Promise.all(responses.map((r) => r.json())))
            .catch((error) => console.log(error));
        // const res = await fetch(
        //     `${process.env.api_key}/posts?per_page=8&page=${
        //         query.page ? Number(query.page.replace(/page_/, '')) : 1
        //     }&${urlSearchQuery}`
        // );
        // console.log(categories);
        const posts_with_cat = await posts.map((post) => {
            categories.map((category) => {
                if (post.categories[0] === category.id) {
                    post.categories[0] = category.name;
                }
            });
            return post;
        });
        await dispatch(setPostData(posts_with_cat));
        await dispatch(setCategoriesData(categories));
        await dispatch(setTagsData(tags));

        if (page.data !== undefined && page.data.status == '404') {
            return {
                props: {
                    error: true,
                },
            };
        } else {
            return {
                props: {
                    page: page[0].acf,
                    totalPages,
                    initialReduxState: reduxStore.getState(),
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                error: error.message,
            },
        };
    }
}
