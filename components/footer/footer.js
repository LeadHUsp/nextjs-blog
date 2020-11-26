import { useDispatch, useSelector } from 'react-redux';

import { IconContext } from 'react-icons';
import { FaVk, FaTelegram, FaSkype } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

import { motion } from 'framer-motion';

import { setOpenForm } from '../../store/reducers/contactReducer';

import style from './footer.module.scss';

function SocialLink({ link, bgColor, icon }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      className={style.social_link}
      whileHover={{
        borderRadius: '50%',
        color: '#fff',
        backgroundColor: bgColor,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      }}
    >
      <IconContext.Provider
        value={{
          /*  color: '#000', */ size: '28px',
          className: `${style.social_icon}`,
        }}
      >
        {icon}
      </IconContext.Provider>
    </motion.a>
  );
}

function Footer() {
  const dispatch = useDispatch();
  const showForm = () => {
    dispatch(setOpenForm());
  };
  return (
    <div className={style.footer}>
      <div className={style.btn_wrapper}>
        <button className={`download ${style.btn_contact}`} onClick={showForm}>
          <IconContext.Provider value={{ className: `${style.contact_icon}` }}>
            <AiOutlineMail />
          </IconContext.Provider>
          Связаться через форму
        </button>
      </div>

      <div className={style.social_links}>
        <SocialLink
          link="https://vk.com/id41874826"
          bgColor="#2787F5"
          icon={<FaVk />}
        />
        <SocialLink
          link="https://t.me/Bogdanvv"
          bgColor="#08c"
          icon={<FaTelegram />}
        />
        <SocialLink
          link="skype:vinokurovbd?chat"
          bgColor="#00aff0"
          icon={<FaSkype />}
        />
      </div>
    </div>
  );
}
export default Footer;
