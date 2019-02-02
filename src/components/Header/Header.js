import React from 'react';

class Header extends React.Component {
    state = {
        showAdminMenu: false
    };

    toggleAdminMenu = () => {
        this.setState(prevState => (
            {showAdminMenu: !prevState.showAdminMenu}
        ));
    };

    render() {
        return (
            <div className="header navbar">
                <div className="header-container">
                    <ul className="nav-left">
                        <li>
                                <span className="sidebar-toggle span-click"
                                      href="/"
                                      onClick={this.props.onCollapseToggle}>
                                    <i className="ti-menu"/>  
                                </span>
                        </li>
                    </ul>
                    <ul className="nav-right">
                        <li className={'dropdown pr-3 ' + (this.state.showAdminMenu ? 'show' : '')}>
                                <span className="dropdown-toggle no-after peers fxw-nw ai-c lh-1 span-click"
                                      aria-expanded={this.state.showAdminMenu}
                                      onClick={this.toggleAdminMenu}>
                                    <div className="peer mR-10">
                                        <img className="w-2r bdrs-50p"
                                             src={require('../../assets/static/images/german_shepherd.jpg')}
                                             alt="Profile"/>
                                    </div>
                                    <div className="peer">
                                        <span className="fsz-sm c-grey-900">German Shepherd</span>
                                    </div>
                                </span>
                            <ul className={'dropdown-menu fsz-sm ' + (this.state.showAdminMenu ? 'show' : '')}>
                                <li><a href="/" className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i
                                    className="ti-settings mR-10"/> <span>Setting</span></a></li>
                                <li><a href="/" className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i
                                    className="ti-user mR-10"/> <span>Profile</span></a></li>
                                <li><a href="/" className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i
                                    className="ti-email mR-10"/> <span>Messages</span></a></li>
                                <li role="separator" className="divider"/>
                                <li><a href="/" className="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i
                                    className="ti-power-off mR-10"/> <span>Logout</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

export default Header;
