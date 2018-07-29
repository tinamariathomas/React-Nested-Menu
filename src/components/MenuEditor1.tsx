import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import MenuBasic, {IMenuData} from "./Menu";
import * as _ from 'lodash';

interface IMenuEditorProps {
    menu: IMenuData;
};

const traverse = (menu: any, depth: number, selected: number[]): IMenuData[] => {
    const childSelectedIndex = selected[depth];
    if(depth < selected.length && menu.hasOwnProperty('children') && menu.children.length > 0) {
        const selectedChild = menu.children[childSelectedIndex];
        return [selectedChild, ...traverse(selectedChild, depth+1, selected)];
    }
    return [];
};

export default class MenuEditor extends React.Component<IMenuEditorProps, any> {
    constructor(props: IMenuEditorProps){
        super(props);
        this.state = {
            selected: [1, 0],
        };
        this.onSelectHandler = this.onSelectHandler.bind(this);
        this.renderAllMenus = this.renderAllMenus.bind(this);
    }
    onSelectHandler(index: number, depth: number = 0) {
        const newSelected = _.slice(this.state.selected, 0, depth + 1);
        newSelected[depth] = index;

        this.setState({selected:newSelected});
    }
    renderAllMenus(menu: IMenuData) {
        const menuItems = traverse(menu, 0, this.state.selected);
        return menuItems.map((menuItem, depth) =>
            <MenuBasic menu={menuItem}
                       onSelectHandler={(selectedIndex) => this.onSelectHandler(selectedIndex, depth + 1)}/>
        );
    }
    render() {
        return (<Grid>
            <MenuBasic menu={this.props.menu} onSelectHandler={this.onSelectHandler}/>
            {this.renderAllMenus(this.props.menu)}
        </Grid>);
    }
}