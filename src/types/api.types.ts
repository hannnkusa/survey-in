// Meta Response Type
export interface metaResponseUI {
    from: number;
    last_page: number;
    page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface dataUI {
	id: string;
    name: string;
}

export interface ResponseUI {
	meta: metaResponseUI;
	data: dataUI[];
}