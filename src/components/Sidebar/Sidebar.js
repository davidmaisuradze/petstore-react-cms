import React from 'react';
import {NavLink} from 'react-router-dom';

import {updateObject} from "../../shared/utility";
import Logo from './Logo/Logo';

class Sidebar extends React.Component {
    state = {
        sidebarItems: {
            dashboard: {
                location: '/shop',
                title: 'Dashboard',
                iconClass: 'c-blue-500 ti-home'
            },
            categories: {
                location: '/categories',
                title: 'Categories',
                iconClass: 'c-teal-500 ti-view-list-alt'
            },
            properties:{
                location:'/properties',
                title: 'Properties',
                iconClass: 'c-orange-500 ti-layout-list-thumb'
            },
            propertyAttributes:{
              location:'/propertyAttributes',
              title: 'Property Attributes',
              iconClass: 'c-orange-500 ti-layout-list-thumb'
            },
            multiLevel: {
                location: '/test',
                title: 'Multiple Level',
                iconClass: 'c-red-500 ti-files',
                children: [
                    {
                        key: 'test1',
                        location: 'test1',
                        title: 'test1'
                    },
                    {
                        key: 'test2',
                        location: 'test2',
                        title: 'test2'
                    }
                ],
                isOpened: false
            }
        }
    };

    toggleItemOpen = (e, key) => {
        e.preventDefault();

        this.setState(prevState => (
            {
                sidebarItems: updateObject(prevState.sidebarItems, {
                    [key]: updateObject(prevState.sidebarItems[key], {
                        isOpened: !prevState.sidebarItems[key].isOpened
                    })
                })
            }
        ));
    };

    render() {
        const sidebarItems = Object.keys(this.state.sidebarItems).map(key => {
            return {
                key: key,
                config: this.state.sidebarItems[key]
            };
        });

        const sidebarUI = sidebarItems.map((item, index) => {
            return item.config.children && item.config.children.length ?
                (<li key={item.key}
                     className={'nav-item dropdown ' + (item.config.isOpened ? 'open' : '')}>
                    <span className="dropdown-toggle span-link"
                          onClick={e => this.toggleItemOpen(e, item.key)}
                    >
                        <span className="icon-holder"><i className={item.config.iconClass}/></span>
                        <span className="title">Pages</span>
                        <span className="arrow"><i className="ti-angle-right"/></span>
                    </span>
                    <ul className="dropdown-menu">
                        {item.config.children.map(child => (
                            <li key={child.key}>
                                <NavLink to={child.location}
                                         className="sidebar-link"
                                         activeClassName='active'
                                >
                                    {child.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>)
                :
                (<li key={item.key}
                     className={'nav-item' + (index === 0 ? ' mT-30' : '')}>
                        <NavLink
                            to={item.config.location}
                            className="sidebar-link"
                            activeClassName='active'
                            exact={true}
                        >
                            <span className='icon-holder'><i className={item.config.iconClass}/></span>
                            <span className="title">{item.config.title}</span>
                        </NavLink>
                    </li>
                );
        });

        return (
            <div className="sidebar">
                <div className="sidebar-inner">
                    <Logo onCollapseToggle={this.props.onCollapseToggle}/>
                    <ul className="sidebar-menu scrollable pos-r ps">
                        {sidebarUI}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
