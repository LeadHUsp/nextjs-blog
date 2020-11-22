import { motion } from 'framer-motion';

import { useDispatch } from 'react-redux';

import { setCloseForm } from '../../store/reducers/contactReducer';

import ContactFormStyled from '../contact_form_styled/contact_form_styled';

import style from './contact_form.module.scss';

function ContactForm() {
  const variants = {
    visible: {
      opacity: 1,
      scale: 50,

      transition: {
        ease: 'easeOut',
        duration: 2,
      },
    },
    hidden: {
      opacity: 0,
      scale: 1,
      width: 100,
      height: 100,
      transition: {
        ease: 'easeOut',
        duration: 1,
      },
    },
  };
  const dispatch = useDispatch();
  const closeForm = () => {
    dispatch(setCloseForm());
  };
  return (
    <>
      <motion.div
        key="contact-form-layer"
        initial="hidden"
        animate="visible"
        variants={variants}
        onClick={closeForm}
        exit="hidden"
        className={style.animated_layout}
      ></motion.div>

      <motion.div
        key="contact-form"
        initial={{ opacity: 0, y: '50%' }}
        animate={{
          opacity: 1,
          y: '0',
          transition: {
            delay: 1,
            duration: 1,
            ease: 'easeOut',
          },
        }}
        exit={{
          opacity: 0,
          y: '50%',
          transition: {
            ease: 'easeOut',
          },
        }}
        className={style.wrapper}
      >
        <ContactFormStyled closeForm={closeForm} />
      </motion.div>
    </>
  );
}
export default ContactForm;
