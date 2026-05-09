import { useTranslation } from 'react-i18next';

export const useAppLanguage = () => {
  const { i18n, t } = useTranslation();
  return {
    isRTL: i18n.language === 'ar',
    t,
    i18n
  };
};