import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import MenuBasic, {IMenuData} from "./Menu";
import * as _ from 'lodash';

interface IMenuEditorProps {
    menu: IMenuData;
};

export default class MenuEditor extends React.Component<IMenuEditorProps, any> {
    constructor(props: IMenuEditorProps){
        super(props);
        this.state = {
            selected: [1, 0],
        };
        this.onSelectHandler = this.onSelectHandler.bind(this);
        this.renderAllMenus = this.renderAllMenus.bind(this);
        this.traverse = this.traverse.bind(this);
    }

    traverse (menu: any, depth: number = 0): IMenuData[] {
        const {selected} = this.state;
        const childSelectedIndex = selected[depth];
        if(depth < selected.length && menu.hasOwnProperty('children') && menu.children.length > 0) {
            const selectedChild = menu.children[childSelectedIndex];
            return [selectedChild, ...this.traverse(selectedChild, depth+1)];
        }
        return [];
    };
    onSelectHandler(index: number, depth: number = 0) {
        const newSelected = _.slice(this.state.selected, 0, depth + 1);
        newSelected[depth] = index;

        this.setState({selected:newSelected});
    }
    renderAllMenus(menu: IMenuData) {
        const menuItems = this.traverse(menu);
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