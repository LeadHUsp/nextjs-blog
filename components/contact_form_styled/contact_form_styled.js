import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubmitSuccess } from '../../store/reducers/contactReducer';

import { Form, Formik, Field, ErrorMessage } from 'formik';
import { object, string, boolean } from 'yup';

import { IconContext } from 'react-icons';
import { VscChromeClose } from 'react-icons/vsc';

import style from './contact_form_styled.module.scss';
import checkboxStyled from '../filter_checkbox/filter_checkbox.module.scss';

import FormLoader from '../UI_parts/form_loader/form_loader';
import FormMessage from '../UI_parts/form_message/form_message';

function AnimatedInput({ disabled, textarea, label, field, form, ...props }) {
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    if (field.value !== '') {
      setHasText(true);
    } else {
      setHasText(false);
    }
  }, [field]);
  return (
    <>
      {!textarea ? (
        <input
          className={style.input}
          {...field}
          {...props}
          disabled={disabled}
        />
      ) : (
        <textarea
          className={style.input}
          {...field}
          {...props}
          disabled={disabled}
        ></textarea>
      )}

      <span className={`${style.label} ${hasText ? style.lable_animate : ''}`}>
        {label}
      </span>
    </>
  );
}

function Input({ name, label, disabled }) {
  return (
    <div className={style.input_wrapper}>
      <Field
        name={name}
        component={AnimatedInput}
        disabled={disabled}
        label={label}
      />
      <span className={style.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}
function TextArea({ name, label, disabled }) {
  return (
    <div className={style.input_wrapper}>
      <Field
        name={name}
        component={AnimatedInput}
        textarea
        row="10"
        className={style.textarea}
        label={label}
        disabled={disabled}
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
        <span className={style.checkbox_text}>
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
  name: '',
  email: '',
  acceptedPrivacy: false,
  message: '',
};

export default function ContactFormStyled({ closeForm }) {
  const dispatch = useDispatch();
  const submitSuccess = useSelector((state) => state.contact.submit_success);
  const submitFail = useSelector((state) => state.contact.submit_fail);

  return (
    <div className={style.contact_form}>
      {submitSuccess && (
        <div className={style.form_message}>
          <FormMessage actionClose={closeForm} status="success" />
        </div>
      )}
      {submitFail && (
        <div className={style.form_message}>
          <FormMessage actionClose={closeForm} status="fail" />
        </div>
      )}
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
          name: string()
            .required('Имя обязательно для заполнения')
            .min(2, 'Имя должно быть длинее чем 2 символа')
            .max(100),
          email: string()
            .required('Поле email обязательно для заполнения')
            .min(2, 'Поле email должно быть длинее чем 2 символа')
            .max(100)
            .matches(
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              'Поле заполнено не корректно'
            ),
          acceptedPrivacy: boolean().oneOf(
            [true],
            'Вы должны прочесть и согласиться с политикой конфиденциальности'
          ),

          message: string()
            .required('Сообщение обязательно для заполнения')
            .min(3)
            .max(100),
        })}
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            let data = {
              service_id: process.env.email_services_id,
              template_id: process.env.email_template_id,
              user_id: process.env.email_user_id,
              template_params: values,
            };
            const response = await fetch(process.env.api_contact_form, {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify(data),
            });
            if (response.status === 200) {
              dispatch(setSubmitSuccess());
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, errors, isSubmitting, isValidating }) => (
          <Form>
            <Input name="name" label="Имя" disabled={isSubmitting} />
            <Input name="email" label="Email" disabled={isSubmitting} />
            <TextArea name="message" label="Сообщение" />
            <CheckBox name="acceptedPrivacy" closeForm={closeForm} />
            <div className={style.input_wrapper}>
              <button
                className={`download ${style.submit}`}
                type="submit"
                disabled={isSubmitting || isValidating}
              >
                {isSubmitting ? <FormLoader /> : 'Отправить'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
