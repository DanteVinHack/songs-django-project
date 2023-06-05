interface IWithId {
	id: number
}

export const findIndexById = <T extends IWithId>(array: T[], id: number) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return i;
		}
	}

	return -1;
}

export const convertFileByURL = async (url: string) => {
	try {
		if (!url) {
			throw new Error("url don't exist")
		}

		const blob = await (await fetch(url)).blob()
		
		const file = new File([blob], 'file.' + blob.type.split('/')[1],{ type: blob.type })

		if (file) {
			return file;
		}

	} catch(error) {
		const err = error as Error
		console.error(err.message)
	}
	
	return null
}

export const getStorageValue = <T>(key: string): T => {
	const item = localStorage.getItem(key) 

	if (!item) {
		throw new Error("Key don't exist in local storage")
	}

	return JSON.parse(item) as T
}

export const setStorageValue = <T>(key: string, newData: T): void => {
	localStorage.setItem(key, JSON.stringify(newData))	
}
