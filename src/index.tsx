import * as React from "react";
import * as ReactDOM from "react-dom";

import {IMenuData} from "./components/Menu";
import MenuEditor from "./components/MenuEditor1";

const menu : IMenuData = {
    label: 'Blah',
    children: [{
        label: '1',
        children: [],
    },{
        label: '2',
        children: [{
            label: '2a',
            children: [{
                label: '2aa',
                children: [],
            }],
        }, {
            label: '2b',
            children: [],
        }],
    }]
};

ReactDOM.render(
    <MenuEditor menu={menu}/>,
    document.getElementById("example")
);