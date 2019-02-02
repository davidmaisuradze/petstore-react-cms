import React, {Component} from 'react';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

export class Layout extends Component {
    state = {
        isCollapsed: false
    };

    toggleIsCollapsed = () => {
        this.setState(prevState => (
            {isCollapsed: !prevState.isCollapsed}
        ));
    };

    render() {
        return (
            <div className={this.state.isCollapsed ? 'is-collapsed' : ''}>
                <Sidebar onCollapseToggle={this.toggleIsCollapsed}/>
                <div className='page-container'>
                    <Header onCollapseToggle={this.toggleIsCollapsed}/>
                    <main className='main-content bgc-grey-100'>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
}

export default Layout;
