import React from 'react';
import {Link} from 'react-router-dom';

const Logo = (props) => (
    <div className="sidebar-logo">
        <div className="peers ai-c fxw-nw">
            <div className="peer peer-greed">
                <Link to='/' className="sidebar-link td-n active">
                    <div className="peers ai-c fxw-nw">
                        <div className="peer">
                            <div className="logo"><img
                                src={require('../../../assets/static/images/logo.png')} alt="Logo"/>
                            </div>
                        </div>
                        <div className="peer peer-greed">
                            <h5 className="lh-1 mB-0 logo-text">Petstore</h5>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="peer">
                <div className="mobile-toggle sidebar-toggle">
                    <span className="td-n span-click"
                       onClick={props.onCollapseToggle}>
                        <i className="ti-arrow-circle-left"/>
                    </span>
                </div>
            </div>
        </div>
    </div>
);

export default Logo;
