export default function Info({currentUser}){
    return(
        <div className="piano__info">
            <div className="piano__user-container">
                <h1 className="piano__current-user">{currentUser}</h1>
            </div>
        </div>
    )
}