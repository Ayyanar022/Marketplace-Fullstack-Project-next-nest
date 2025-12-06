
export function extractPublicId(url:string){
    const parts = url.split('/');
    const file = parts.pop();
    const folder = parts.slice(parts.indexOf('upload')+1).join('/')

    return folder+ '/' +file?.split('.')[0]
}