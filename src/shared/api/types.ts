export interface SearchParams {
	[key: string]: string | string[] | undefined
}

export interface RequestOptions extends RequestInit {
	headers?: Record<string, string>
	params?: SearchParams
}

export type RequestConfig<Payload = undefined> = Payload extends undefined
	? { options?: RequestOptions }
	: { payload: Payload, options?: RequestOptions }

export type ApiResponse<Data> = Promise<CustomResponse<Data>>

export interface CustomResponse<Data> {
	success: boolean
	status: number
	statusText: string
	data: Data
}
