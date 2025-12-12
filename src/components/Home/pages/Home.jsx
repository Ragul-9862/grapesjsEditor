import Sidebar from '../../layout/Sidebar'
import Layout from '../Layout'
import useEditorInitializer from '../../../hooks/useEditorInitializer'

const Home = () => {

    useEditorInitializer();

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <Layout />
            </div>
        </div>
    );
};

export default Home;
