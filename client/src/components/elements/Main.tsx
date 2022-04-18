import { FunctionComponent, memo, useEffect, useRef } from "react";

const Main: FunctionComponent<{ children: any }> = ({ children }) => {


    return (
        <div id="main" className="flex-1 flex w-full overflow-y-scroll overflow-x-hidden no-scrollbar">
            {children}
        </div>
    );
}

export default memo(Main);