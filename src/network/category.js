import { request } from "./request";

export function getCategoryLefts() {
	return request({
		url: '/category'
	})
}

export function getCategoryRights(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
