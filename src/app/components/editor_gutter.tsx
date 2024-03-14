

export function EditorGutter({visible}: {visible: boolean}) {
    return(
        <div className={`p-0 w-1 my-1 rounded border-l-4 border-blue-200 ${visible ? 'opacity-1':'opacity-0' }`}>
                {/* <FaAnchorLock className={`h-4 w-4 text-slate-500 ${showAnchor(editorMode)? 'visible': 'hidden'}`}  /> */}
        </div>
    )
}