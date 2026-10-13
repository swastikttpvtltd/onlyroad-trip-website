const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),Module=require('node:module'),ts=require('typescript');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),resolve=Module._resolveFilename;
Module._resolveFilename=function(name,...args){return resolve.call(this,name.startsWith('@/')?path.join(root,name.slice(2)):name,...args)};
const compile=(s)=>ts.transpileModule(s,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true,jsx:ts.JsxEmit.ReactJSX}}).outputText;
for(const e of ['.ts','.tsx'])require.extensions[e]=(m,f)=>m._compile(compile(fs.readFileSync(f,'utf8')),f);
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {packages}=require('../data/packages.ts'),{packageCardSummary}=require('../lib/packageCardSummary.ts');
function baseline(file){const m=new Module(path.join(root,file),module);m.filename=path.join(root,file);m.paths=module.paths;m._compile(compile(execFileSync('git',['show','7c9cc3708765f0a35855c74e02ac93f32fe8767c:'+file],{cwd:root,encoding:'utf8'})),m.filename);return m.exports.default;}
function render(component,props){return renderToStaticMarkup(React.createElement(component,props));}
for(const file of ['components/GroupToursSlider.tsx','components/ThemePackageSliders.tsx','components/FeaturedDestinations.tsx']){
 const before=render(baseline(file),{}),after=render(require(path.join(root,file)).default,{packages:packages.map(packageCardSummary)});
 assert.equal(after,before,file+' exact server-rendered HTML'); console.log('PASS '+file+' identical rendered HTML');
}
const oldCard=baseline('components/PackageCard.tsx'),newCard=require('../components/PackageCard.tsx').default;
for(const pkg of packages){const normalized={...pkg,inclusions:pkg.inclusions||[],exclusions:pkg.exclusions||[]};assert.equal(render(newCard,{pkg:normalized}),render(oldCard,{pkg:normalized}),pkg.slug+' exact rendered card HTML');}
console.log('PASS all '+packages.length+' package cards preserve rendered HTML');
