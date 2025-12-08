import initEditor from '../../utils/layout';
import { useEffect } from 'react';

const Layout = () => {

    useEffect(() => {
        initEditor();
    }, [])

    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-2 col-md-2">
                    {/* Blocks */}
                    <div className="sidebar">
                        <div id="blocks" className="dropdown-area open"></div>
                    </div>
                </div>
                <div className="col-10 col-md-10" >
                    <div className='layout-body'>
               
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
