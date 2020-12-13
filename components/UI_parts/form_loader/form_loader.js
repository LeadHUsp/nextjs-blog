import style from './form_loader.module.scss';

export default function FormLoader() {
  return <div className={style['lds-dual-ring']}></div>;
}
