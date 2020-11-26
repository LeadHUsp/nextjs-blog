import Link from 'next/link';

import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setResponse } from '../../store/reducers/contactReducer';

import { Form, Formik, Field, useField, ErrorMessage } from 'formik';
import { number, object, string, boolean, array, mixed } from 'yup';

import { IconContext } from 'react-icons';
import { VscChromeClose } from 'react-icons/vsc';

import style from './contact_form_styled.module.scss';
import checkboxStyled from '../filter_checkbox/filter_checkbox.module.scss';

function AnimatedInput({ textarea, label, field, form, ...props }) {
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    /*  console.log(field); */
    if (field.value !== '') {
      setHasText(true);
    } else {
      setHasText(false);
    }
  }, [field]);
  return (
    <>
      {!textarea ? (
        <input className={style.input} {...field} {...props} />
      ) : (
        <textarea className={style.input} {...field} {...props}></textarea>
      )}

      <span className={`${style.label} ${hasText ? style.lable_animate : ''}`}>
        {label}
      </span>
    </>
  );
}

function Input({ name, label }) {
  return (
    <div className={style.input_wrapper}>
      <Field name={name} component={AnimatedInput} label={label} />
      <span className={style.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}
function TextArea({ name, label }) {
  return (
    <div className={style.input_wrapper}>
      <Field
        name={name}
        component={AnimatedInput}
        textarea
        row="10"
        className={style.textarea}
        label={label}
      />
      <span className={style.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}
function CheckBox({ name, closeForm }) {
  return (
    <div className={checkboxStyled.filter_box}>
      <label className={checkboxStyled.lable}>
        <Field
          type="checkbox"
          name={name}
          className={checkboxStyled.checkbox}
        />
        <span className={checkboxStyled.checkmark}></span>
        <span>
          Я принимаю условия&nbsp;
          <Link href="/privacy">
            <a className={style.link_privacy} onClick={closeForm}>
              политики конфиденциальности.
            </a>
          </Link>
        </span>
      </label>
      <span className={style.checkbox_error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}
const initialValues = {
  user_name: '',
  user_email: '',
  acceptedPrivacy: false,
  user_message: '',
};

/* async (values) => {
  try {
    // Default options are marked with *
    console.log(values);
    const response = await fetch(
      `http://localhost:8000/auth/register`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.

        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(values), // body data type must match "Content-Type" header
      }
    );
    return await console.log(response.json()); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.log(error);
  }
} */

export default function ContactFormStyled({ closeForm }) {
  const dispatch = useDispatch();
  return (
    <div className={style.contact_form}>
      <button onClick={closeForm} className={style.close_btn}>
        <IconContext.Provider
          value={{ size: 23, className: `${style.close_icon}` }}
        >
          <VscChromeClose />
        </IconContext.Provider>
      </button>
      <h2 className={style.form_title}>Отправьте мне сообщение</h2>
      <Formik
        validationSchema={object({
          user_name: string()
            .required('Имя обязательно для заполнения')
            .min(2, 'Имя должно быть длинее чем 2 символа')
            .max(100),
          user_email: string()
            .required('Поле email обязательно для заполнения')
            .min(2, 'Поле email должно быть длинее чем 2 символа')
            .max(100)
            .matches(
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              'Поле заполнено не корректно'
            ),
          acceptedPrivacy: boolean().oneOf(
            [true],
            'Вы должны прочесть и согласиться с политикой'
          ),

          user_message: string()
            .required('Сообщение обязательно для заполнения')
            .min(3)
            .max(100),
        })}
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            // Default options are marked with *
            console.log(JSON.stringify(values));
            const response = await fetch(`${process.env.api_contact_form}`, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.

              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },

              body: JSON.stringify(values), // body data type must match "Content-Type" header
            });
            return await console.log(response); // parses JSON response into native JavaScript objects
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, errors, isSubmitting, isValidating }) => (
          <Form>
            <Input name="user_name" label="Имя" />
            <Input name="user_email" label="Email" />
            <TextArea name="user_message" label="Сообщение" />
            <CheckBox name="acceptedPrivacy" closeForm={closeForm} />
            <div className={style.input_wrapper}>
              <button
                className={`download ${style.submit}`}
                type="submit"
                /*  disabled={isSubmitting || isValidating} */
              >
                {' '}
                Отправить
              </button>
              {isSubmitting && 'is Submitting'}
              {isValidating && 'is Validating'}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
