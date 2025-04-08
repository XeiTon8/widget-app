import React from 'react';
import GridLayout from 'react-grid-layout';

import { Header } from '../header';
import { EditPanel } from '../edit-panel';

export interface IRenderedWidget {
    id: number;
    name: string;
    position: {
        x: number;
        y: number;
    }
    size: number;
}

export interface IWidget {
    id: number;
    name: string;
    added: boolean;
}

export const Dashboard = () => {

    const CODE_WORD = "LIQN";

    const [widgets, setWidgets]  = React.useState<IRenderedWidget[]>([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [layout, setLayout] = React.useState<any>();

    const renderWidgets = () => {
        return widgets.map((widget: IRenderedWidget) => {
            return (
            <div key={String(widget.id)} >
                <div  
                    className="drag-handle relative group" 
                    style={{backgroundColor: "white", borderRadius: "10px", paddingBottom: "15px", height: "100%", padding: "5px", minHeight: "50px", minWidth: "150px"}}>
                {widget.name}
                <button className=" !w-[20px] !h-[20px] !p-[0px] absolute top-2 right-2 bg-gray-200 text-[13px] rounded opacity-0 group-hover:opacity-100 transition">
                    ✕ 
                </button>
                </div>
            </div>
        )
    })
    }

    const loadLayout = () => {
        const savedItems = localStorage.getItem('layout');
        return savedItems ? JSON.parse(savedItems) : [];
    }

    React.useEffect(() => {
    setLayout(loadLayout())
    alert(CODE_WORD);
    }, [])

    const confirmEdit = (layout: any) => {
        localStorage.setItem('layout', JSON.stringify(layout));
        setLayout(layout);
    }

    return (

        <div className='app__container'>
            <Header />
            <main>
                <EditPanel 
                    widgets={widgets} 
                    setWidgets={setWidgets} 
                    isEdit={isEdit}
                    setIsEdit={setIsEdit} 
                    layout={layout}
                    setLayout={setLayout}
                    />
                <GridLayout
                    className='layout'
                    layout={layout}
                    cols={12}
                    rowHeight={30}
                    width={1300}
                    margin={[20, 30]}
                    onLayoutChange={confirmEdit}
                    isDraggable={isEdit}
                    isDroppable={isEdit}
                    isResizable={isEdit}
                    draggableHandle='.drag-handle'
                    resizeHandles={ isEdit ? ['se'] : []}
                    >
                    {renderWidgets()}
                    </GridLayout>
            </main>
        </div>
        
    )
}