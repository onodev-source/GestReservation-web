
const NoContent = ({message, styleSpace}) => {
    
    return (
        <h3 style={styleSpace && styleSpace}>
            {message !== '' ? message : 'No content'}
        </h3>
    )
}

export  default NoContent;