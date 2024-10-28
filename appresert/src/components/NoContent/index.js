
const NoContent = ({message}) => {
    
    return (
        <h3>
            {message !== '' ? message : 'No content'}
        </h3>
    )
}

export  default NoContent;