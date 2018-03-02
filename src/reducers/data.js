import concat from 'lodash/concat'

import { ADD_DATASET_REQUEST, ADD_DATASET_SUCCESS, ADD_DATASET_FAIL } from 'constants/ActionTypes'

const initialState = {
  isFetch: false,
  /*
  datasetList: [],
  */
  datasetList: [
    {
      id: 'jill',
      name: 'Jill Dataset',
      description: 'The dataset that contains many Jills',
      images: [
        'http://jillsantopolo.com/wordpress/wp-content/uploads/2016/07/Jill-8730-wall.crop_-300x295.jpg',
        'https://www.law.hawaii.edu/sites/www.law.hawaii.edu/files/styles/headshot_large/public/people/17248/Ramsfield_Jill.jpg?itok=4Ba6_nY1',
        'https://hope.edu/graphics/prportraits/JillNutt.jpg',
        'https://vg-images.condecdn.net/image/qdZr33EDBvm/crop/810/f/jill-mcdonald-vogue-5may17-pa.jpg',
        'https://cdnimages.barry.edu/includes/img/social-work/bio/jilllevenson.jpg',
      ],
    },
    {
      id: 'jill2',
      name: 'Jill Dataset 2',
      description: 'The dataset that contains many Jills',
      images: [
        'http://jillsantopolo.com/wordpress/wp-content/uploads/2016/07/Jill-8730-wall.crop_-300x295.jpg',
        'https://www.law.hawaii.edu/sites/www.law.hawaii.edu/files/styles/headshot_large/public/people/17248/Ramsfield_Jill.jpg?itok=4Ba6_nY1',
        'https://hope.edu/graphics/prportraits/JillNutt.jpg',
        'https://vg-images.condecdn.net/image/qdZr33EDBvm/crop/810/f/jill-mcdonald-vogue-5may17-pa.jpg',
        'https://cdnimages.barry.edu/includes/img/social-work/bio/jilllevenson.jpg',
      ],
    },
  ],
}

export default function data(state = initialState, action) {
  switch (action.type) {
    case ADD_DATASET_REQUEST: {
      return {
        ...state,
        isFetch: true,
      }
    }

    case ADD_DATASET_SUCCESS: {
      const newDatasetList = concat(state.datasetList, action.dataset)

      return {
        ...state,
        isFetch: false,
        datasetList: newDatasetList,
      }
    }

    case ADD_DATASET_FAIL: {
      return {
        ...state,
        isFetch: false,
      }
    }

    default:
      return state
  }
}
