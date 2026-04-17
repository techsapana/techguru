(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Editor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$blocknote$2f$react$2f$dist$2f$blocknote$2d$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@blocknote/react/dist/blocknote-react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$blocknote$2f$mantine$2f$dist$2f$blocknote$2d$mantine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@blocknote/mantine/dist/blocknote-mantine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const EditorContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>Promise.resolve(EditorContentComponent), {
    ssr: false
});
_c = EditorContent;
function EditorContentComponent({ value = "", onChange }) {
    _s();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$blocknote$2f$react$2f$dist$2f$blocknote$2d$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateBlockNote"])();
    const lastSyncedValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const onChangeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onChange);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorContentComponent.useEffect": ()=>{
            onChangeRef.current = onChange;
        }
    }["EditorContentComponent.useEffect"], [
        onChange
    ]);
    // Sync external value changes (like selecting an item to edit) into the editor.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorContentComponent.useEffect": ()=>{
            const incomingValue = value ?? "";
            if (incomingValue === lastSyncedValueRef.current) return;
            if (!incomingValue) {
                editor.replaceBlocks(editor.document, [
                    {
                        type: "paragraph",
                        content: ""
                    }
                ]);
                lastSyncedValueRef.current = "";
                return;
            }
            try {
                const blocks = JSON.parse(incomingValue);
                editor.replaceBlocks(editor.document, blocks);
            } catch  {
                // Backward compatibility for records saved as plain text.
                editor.replaceBlocks(editor.document, [
                    {
                        type: "paragraph",
                        content: incomingValue
                    }
                ]);
            }
            lastSyncedValueRef.current = incomingValue;
        }
    }["EditorContentComponent.useEffect"], [
        editor,
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorContentComponent.useEffect": ()=>{
            editor.onEditorContentChange({
                "EditorContentComponent.useEffect": ()=>{
                    const content = JSON.stringify(editor.document);
                    lastSyncedValueRef.current = content;
                    onChangeRef.current?.(content);
                }
            }["EditorContentComponent.useEffect"]);
        }
    }["EditorContentComponent.useEffect"], [
        editor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full min-h-96 border-2 border-gray-300 rounded-lg overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$blocknote$2f$mantine$2f$dist$2f$blocknote$2d$mantine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockNoteView"], {
            editor: editor,
            theme: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$blocknote$2f$mantine$2f$dist$2f$blocknote$2d$mantine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lightDefaultTheme"]
        }, void 0, false, {
            fileName: "[project]/src/components/Editor.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Editor.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(EditorContentComponent, "zIEFXmv1FsXjP7QjlSe+uRzc1C0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$blocknote$2f$react$2f$dist$2f$blocknote$2d$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateBlockNote"]
    ];
});
_c1 = EditorContentComponent;
function Editor(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditorContent, {
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/Editor.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, this);
}
_c2 = Editor;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "EditorContent");
__turbopack_context__.k.register(_c1, "EditorContentComponent");
__turbopack_context__.k.register(_c2, "Editor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/admin/(sub pages)/courses/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Editor.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const API_URL = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAIN"]}/api/admin/courses`;
function AdminCourses() {
    _s();
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        courseName: "",
        title: "",
        duration: "",
        description: "",
        content: "",
        categoryId: "",
        features: [
            ""
        ],
        images: []
    });
    const fetchCategories = async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAIN"]}/api/public/categories`);
            setCategories(res.data.data);
        } catch (err) {
            console.error("Failed to load categories", err);
        }
    };
    const fetchCourses = async ()=>{
        setLoading(true);
        setError("");
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("adminToken");
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCourses(res.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load courses");
        }
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminCourses.useEffect": ()=>{
            fetchCourses();
            fetchCategories();
        }
    }["AdminCourses.useEffect"], []);
    const handleChange = (e, idx)=>{
        const { name, value } = e.target;
        if (name === "features" && typeof idx === "number") {
            const newFeatures = [
                ...form.features
            ];
            newFeatures[idx] = value;
            setForm({
                ...form,
                features: newFeatures
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };
    const handleFileChange = (e)=>{
        if (e.target.files) {
            setForm({
                ...form,
                images: Array.from(e.target.files)
            });
        }
    };
    const addFeature = ()=>setForm({
            ...form,
            features: [
                ...form.features,
                ""
            ]
        });
    const removeFeature = (idx)=>{
        const newFeatures = form.features.filter((_, i)=>i !== idx);
        setForm({
            ...form,
            features: newFeatures
        });
    };
    const handleSubmit = async ()=>{
        if (saving) return;
        if (!form.courseName.trim()) return alert("Please enter course name");
        if (!form.title.trim()) return alert("Please enter title");
        if (!form.description.trim()) return alert("Please enter description");
        if (!form.categoryId) return alert("Please select a category");
        const descriptionContent = form.description;
        const contentData = form.content;
        const formData = new FormData();
        formData.append("course", JSON.stringify({
            courseName: form.courseName,
            title: form.title,
            duration: form.duration,
            description: descriptionContent,
            content: contentData,
            categoryId: Number(form.categoryId),
            features: form.features.filter((f)=>f.trim())
        }));
        form.images.forEach((img)=>formData.append("images", img));
        try {
            setSaving(true);
            if (selected) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${API_URL}/${selected.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("adminToken")}`
                    }
                });
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(API_URL, formData, {
                    headers: {
                        Authorization: `Bearer ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("adminToken")}`
                    }
                });
            }
            alert("Success!");
            setForm({
                courseName: "",
                title: "",
                duration: "",
                description: "",
                content: "",
                categoryId: "",
                features: [
                    ""
                ],
                images: []
            });
            setSelected(null);
            fetchCourses();
        } catch (err) {
            console.error(err);
            alert("Failed to save course");
        } finally{
            setSaving(false);
        }
    };
    const handleDelete = async (id)=>{
        if (!confirm("Are you sure you want to delete this course?")) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("adminToken")}`
                }
            });
            fetchCourses();
        } catch (err) {
            console.error(err);
            alert("Failed to delete course");
        }
    };
    const handleEdit = (c)=>{
        const matchedCategoryId = c.categoryId ?? categories.find((cat)=>cat.name === c.category)?.id;
        setSelected(c);
        setForm({
            courseName: c.courseName,
            title: c.title,
            duration: c.duration,
            description: c.description,
            content: c.content,
            categoryId: matchedCategoryId ? String(matchedCategoryId) : "",
            features: c.features,
            images: []
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white text-black p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold mb-10",
                    children: "Course Management"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                    lineNumber: 204,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-2 border-gray-300 p-8 rounded-xl bg-white shadow-sm mb-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold mb-6",
                            children: selected ? "Edit Course" : "Add New Course"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "courseName",
                                    value: form.courseName,
                                    placeholder: "Course Name",
                                    onChange: handleChange,
                                    className: "border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "title",
                                    value: form.title,
                                    placeholder: "Title",
                                    onChange: handleChange,
                                    className: "border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "duration",
                                    value: form.duration,
                                    placeholder: "Duration",
                                    onChange: handleChange,
                                    className: "border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    name: "categoryId",
                                    value: form.categoryId,
                                    onChange: handleChange,
                                    className: "border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500 bg-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select Category"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this),
                                        categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: cat.id,
                                                children: cat.name
                                            }, cat.id, false, {
                                                fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "font-semibold text-lg block mb-3",
                                    children: "Description:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: form.description,
                                    onChange: (value)=>setForm({
                                            ...form,
                                            description: value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "font-semibold text-lg block mb-3",
                                    children: "Full Content:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: form.content,
                                    onChange: (value)=>setForm({
                                            ...form,
                                            content: value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "font-semibold text-lg block mb-3",
                                    children: "Features:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: form.features.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "features",
                                                    value: f,
                                                    onChange: (e)=>handleChange(e, i),
                                                    placeholder: `Feature ${i + 1}`,
                                                    className: "border-2 border-gray-300 p-3 text-lg flex-1 rounded focus:outline-none focus:border-blue-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 19
                                                }, this),
                                                form.features.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>removeFeature(i),
                                                    className: "bg-red-500 hover:bg-red-600 text-white px-4 rounded font-semibold",
                                                    children: "Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                            lineNumber: 288,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: addFeature,
                                    className: "text-blue-600 font-semibold mt-3 text-lg",
                                    children: "+ Add Feature"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "font-semibold text-lg block mb-2",
                                    children: "Images:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    multiple: true,
                                    onChange: handleFileChange,
                                    className: "border-2 border-gray-300 p-3 w-full rounded"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                form.images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-2",
                                    children: [
                                        form.images.length,
                                        " file(s) selected"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSubmit,
                                    disabled: saving,
                                    className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold text-lg",
                                    children: saving ? selected ? "Updating..." : "Creating..." : selected ? "Update Course" : "Create Course"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this),
                                selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: saving,
                                    onClick: ()=>{
                                        setSelected(null);
                                        setForm({
                                            courseName: "",
                                            title: "",
                                            duration: "",
                                            description: "",
                                            content: "",
                                            categoryId: "",
                                            features: [
                                                ""
                                            ],
                                            images: []
                                        });
                                    },
                                    className: "bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded font-semibold text-lg",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 352,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 336,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold mb-6",
                            children: [
                                "Available Courses (",
                                courses?.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this),
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Loading courses..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 382,
                            columnNumber: 13
                        }, this) : courses?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-10 bg-gray-100 rounded-lg",
                            children: "No courses yet. Create one to get started!"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 384,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: courses.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-2 border-gray-300 p-6 rounded-xl shadow-sm hover:shadow-md transition",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-xl mb-1",
                                            children: c.courseName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                            lineNumber: 394,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-2 text-gray-700",
                                            children: [
                                                c.title,
                                                " • ",
                                                c.duration,
                                                " • ",
                                                c.category
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                            lineNumber: 395,
                                            columnNumber: 19
                                        }, this),
                                        c.features.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-700 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "Features:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 23
                                                }, this),
                                                " ",
                                                c.features.join(", ")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3 mt-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleEdit(c),
                                                    className: "bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold",
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDelete(c.id),
                                                    className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold",
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                            lineNumber: 388,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
                    lineNumber: 376,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
            lineNumber: 200,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/(sub pages)/courses/page.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
_s(AdminCourses, "1JGZLCN4fqEiqwJrJ2G/C+dH9zQ=");
_c = AdminCourses;
var _c;
__turbopack_context__.k.register(_c, "AdminCourses");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_562b090c._.js.map