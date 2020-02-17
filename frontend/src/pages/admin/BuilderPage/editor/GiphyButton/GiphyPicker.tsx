import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import { debounce } from 'throttle-debounce'
import axios, { AxiosResponse } from 'axios'
import Popover from 'react-bootstrap/Popover'

const ENDPOINT = 'https://api.giphy.com/v1/gifs/'
const API_KEY = '4voMr27iyxRlBAGwrYXq0AZ9ZFhqhYkr'

const Wrapper = styled.div`
`
type GiphyResults = {
  pagination: {
    total_count: number
    count: number
    offset: number
  }
  data: GiphyItem[]
}

type GiphyItem = {
  title: string
  id: string
  images: {
    fixed_width: { url: string }
  }
}

type Props = {
}

type State = {
  searchValue: string
  results?: GiphyResults
}

export default class GiphyPicker extends React.Component<Props, State> {
  state: State = {
    searchValue: ''
  }

  componentDidMount() {
    this.triggerSearch()
  }

  _search = () => {
    const { searchValue } = this.state

    const action = searchValue ? 'search' : 'trending'
    const params = {
      api_key: API_KEY,
      lang: 'en',
      rating: 'pg-13',
      q: searchValue,
      limit: 20
    }

    axios.get(`${ENDPOINT}${action}`, { params })
      .then((results: AxiosResponse<GiphyResults>) => {
        this.setState({ results: results.data })
      })
  }
  triggerSearch = debounce(500, this._search)

  searchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value })
    this.triggerSearch()
  }

  render() {
    const items = this.state.results?.data
    return (
      <StyledContent>
        <StyledControl
          type="text"
          placeholder="Search for a GIF..."
          onChange={this.searchValueChange}
          autoFocus
        />
        <GiphyList>
          {items && items.map(item =>
            <Giphy key={item.id} alt={item.title} src={item.images.fixed_width.url} />
          )}
        </GiphyList>
      </StyledContent>
    )
  }
}

const StyledContent = styled(Popover.Content)`
  padding: 0;
`

const StyledControl = styled(Form.Control)`
  margin: 10px;
  width: 200px;
`

const Giphy = styled.img`
  border-radius: 3px;
  margin-bottom: 8px;  
  display: block; 
  cursor: pointer;

  box-sizing: border-box;
`

const GiphyList = styled.div`
  padding: 0 0 0 10px;
  height: 400px;
  overflow: auto;
`