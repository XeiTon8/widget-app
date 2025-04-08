import React from 'react';
import { IRenderedWidget, IWidget } from '../dashboard';
import { Layout } from 'react-grid-layout';
import { ChevronDownIcon } from 'lucide-react';
import { SearchBar } from '../search-bar';

interface EditPanelProps {
widgets: any[];
setWidgets: (val: any) => void;
isEdit: boolean;
setIsEdit: (val: boolean) => void;
layout: Layout;
setLayout: (val: any) => void;
}

export const EditPanel: React.FC<EditPanelProps> = ({widgets, setWidgets, isEdit, setIsEdit, setLayout}) => {

    const [availableWidgets, setAvailableWidgets] = React.useState<IWidget[]>([
        {id: 1, name: "Open tasks", added: false},
        {id: 2, name: "New tasks", added: false},
        {id: 3, name: "Task projects", added: false},
        {id: 4, name: "Due today", added: false},
        {id: 5, name: "Due this week", added: false},
        {id: 6, name: "Overdue tasks", added: false},
        {id: 7, name: "Red flag tasks", added: false},
        {id: 8, name: "Delay project completion", added: false},
        {id: 9, name: "Open projects by health", added: false},
        {id: 10, name: "Open projects by priority", added: false},
        {id: 11, name: "Open projects by assignee", added: false},
        {id: 12, name: "Approval tasks", added: false}, 
        {id: 13, name: "Review tasks", added: false},
        {id: 14, name: "Task completion", added: false},
        {id: 15, name: "Task status", added: false},
        {id: 16, name: "Task deadlines", added: false},
        {id: 17, name: "Task dashboard", added: false},
        ]
);
    const [initialAvailableWidgets, setInitialAvailableWidgets] = React.useState(availableWidgets);

    const [widgetsBeforeEdit, setWidgetsBeforeEdit] = React.useState(widgets);

    const openEdit   = () =>  {
        setIsEdit(true);
        setWidgetsBeforeEdit(widgets);
        setInitialAvailableWidgets(availableWidgets);
    }

    const confirmEdit = () => {setIsEdit(false);}

    const cancelEdit = () => {
        setWidgets(widgetsBeforeEdit);
        setAvailableWidgets(initialAvailableWidgets);
        setIsEdit(false);
    }

    const handleAddWidget = (widget: IWidget) => {

        const updatedAvailableW = availableWidgets.map(widgetToAdd =>
            widgetToAdd.id === widget.id ? { ...widgetToAdd, added: true } : widgetToAdd
        );
        setAvailableWidgets(updatedAvailableW);

        const newRenderedWidget: IRenderedWidget = {
            id: widget.id,
            name: widget.name,
            position: { x: 0, y: 0 }, 
            size: 300, 
        };
        setWidgets((prev: IRenderedWidget[]) => [...prev, newRenderedWidget])

        const newLayoutItem: Layout = {
        i: widget.id.toString(),
        x: 0,
        y: 0,
        w: 3,
        h: 1,
        isResizable: isEdit,
    };
    setLayout((prev: any) => [...prev, newLayoutItem]);
}


    const handleRemoveWidget = (widget: IWidget) => {

        const updatedAvailableW = availableWidgets.map((widgetToRemove) => 
            widgetToRemove.id === widget.id ? {...widgetToRemove, added: false}: widgetToRemove
        );
        setAvailableWidgets(updatedAvailableW);

        const newWidgets = widgets.filter((widgetToRM) => widgetToRM.id !== widget.id);
        setWidgets(newWidgets);
    }

    const renderWidgets = () => {
        return availableWidgets.map((widget: IWidget, i) => {
            return (
                <div className={`
                ${i === availableWidgets.length - 1 ? "!w-full" : "auto"}
                min-w-[285px] ${i === availableWidgets.length - 1 ? "max-w-[100%]" : "max-w-[285px]"}
                h-[70px] 
                flex justify-between gap-[15px]
                border-[1px] border-[#1c93ff]  border-color-[#1c93ff] 
                rounded-[10px]
                p-[16px]
                ${widget.added ? "bg-[#e6f7ff]" : "inherit"}
                `}>
                    <span className='text-[14px]'>{widget.name}</span>
                    {widget.added ? (<button className="max-w-[66px] h-[24px] !pt-[0px] p-[5px] outline-none" onClick={() => handleRemoveWidget(widget)}>Remove</button>
                    ) : 
                    (
                    <button className='max-w-[40px] h-[24px] !p-0' onClick={() => handleAddWidget(widget)}>Add</button>
                    )}
                </div>
            )
        })
    }

    return (
        <>
        <div className="flex flex-col bg-white w-full rounded-[10px] p-[10px] mb-[15px]">
        <div className="relative flex justify-between pl-[10px]">
            <div className="flex w-full">
                <span className="pr-[10px] font-bold">Filters</span>
                <div className="flex flex-col w-full gap-[10px]">
                    <div className="flex justify-between w-full">
                    <SearchBar />
                    <div className="flex gap-[5px]">
                        <div>
                            {isEdit ? 
                                <div className="flex gap-[5px]">
                                    <button onClick={() => cancelEdit()}>Cancel</button>
                                    <button className="!bg-blue-500 text-white hover:!text-white" onClick={() => confirmEdit()}>Save Changes</button>
                                </div> :  
                                <button onClick={() => openEdit()}>Edit dashboard</button>
                            }
                        </div>
                        <button className="flex items-center justify-between text-center">
                            <span className='w-full'>Custom View</span>
                            <ChevronDownIcon size={18} />
                        </button>
                    </div>
                    </div>
            
                <div className="flex">
                    <button className="max-w-[114px]">Add filter</button>
                </div>
                
                </div>
            </div>
        </div>
        
        </div>
        {isEdit && (
            <div className="flex flex-col gap-[15px] bg-white w-full p-[10px] rounded-[10px] ">
            <div>
                <span className="font-bold text-base">Manage Widgets</span>
            </div>
            <div>
            <SearchBar isFullWidth={true} />
            </div>
            <div className='overflow-auto max-h-64 flex  flex-wrap gap-[12px] p-10'>
            {renderWidgets()}
            </div>
            </div>
        )}
        </>
    )
}