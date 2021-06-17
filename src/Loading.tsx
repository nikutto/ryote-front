import loadingGif from './loading.gif'

const Loading: React.FC =  () => {
    return (<img style={{
            margin:'auto',
            width:'10%'
        }}
        className="d-flex align-items-center" src={loadingGif} alt="Loading..."/>)
}

export default Loading