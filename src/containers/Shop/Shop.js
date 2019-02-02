import React, {Component} from 'react';
import Item from '../../components/Item/Item';

export class Shop extends Component {
    render() {
        const itemsData = [
            {id: 1, category: 'dog', name: 'Charlie'},
            {id: 2, category: 'dog', name: 'Lucy'},
            {id: 3, category: 'cat', name: 'Smokey'}
        ];

        const items = itemsData.map(item => {
            return <Item key={item.id} category={item.category} name={item.name}/>
        });

        return (<div>{items} </div>);
    }

}

export default Shop;