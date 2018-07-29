import * as React from 'react'
import { Menu, Grid } from 'semantic-ui-react'

export interface IMenuData {
    label: string;
    children: IMenuData[];
}

interface IMenuEditorProps {
    menu: IMenuData;
    onSelectHandler: (index: number) => any;
};

export default class MenuExampleBasic extends React.Component<IMenuEditorProps, any> {
    constructor(props: IMenuEditorProps) {
        super(props);
        this.renderMenuItems = this.renderMenuItems.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(index: number) {
        this.props.onSelectHandler(index);
    }

    renderMenuItems(children: IMenuData[]) {
        return children.map((menuItem, index) =>
            <Menu.Item name={menuItem.label} onClick={(event: any, {name}) => this.onClick(index)}/>);
    }

    render() {
        const {menu: {children}} = this.props;
        return children.length > 0 ? <Grid.Column stretched>
            <Menu vertical>
            {this.renderMenuItems(children)}
            </Menu>
            </Grid.Column> : null;
    }
}