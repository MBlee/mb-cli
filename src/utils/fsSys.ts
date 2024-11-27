import fs from 'fs'

const mMkdir = (dir:string)=>new Promise<void>((res)=>{
	fs.mkdir(dir,{recursive:true},err=>{
		if (err) {
			return console.log(`创建文件夹${dir}失败`);
		}
		console.log(`创建文件夹${dir}成功`)
		res()
	})
})

export {mMkdir}