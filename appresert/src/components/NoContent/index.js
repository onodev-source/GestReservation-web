import { useTranslation } from "react-i18next";

const NoContent = ({message, styleSpace}) => {
    const {t} = useTranslation()
    
    return (
        <h3 style={styleSpace && styleSpace}>
            {message !== '' ? message : t('words.no_content')}
        </h3>
    )
}

export  default NoContent;