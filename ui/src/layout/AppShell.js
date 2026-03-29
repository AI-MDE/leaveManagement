import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
export const AppShell = ({ children }) => {
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(TopBar, {}), _jsx("main", { className: "flex-1 overflow-auto p-6", children: children })] })] }));
};
