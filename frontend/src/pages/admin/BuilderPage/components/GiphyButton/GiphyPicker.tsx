import axios, { AxiosResponse } from 'axios'
import React, { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import Popover from 'react-bootstrap/Popover'
import { connect } from 'react-redux'
import { createImageItem } from 'services/script'
import { addItem } from 'store/slices/script'
import styled from 'styled-components'
import { debounce } from 'throttle-debounce'

const ENDPOINT = 'https://api.giphy.com/v1/gifs/'
const API_KEY = '4voMr27iyxRlBAGwrYXq0AZ9ZFhqhYkr'

const StyledContent = styled(Popover.Content)`
  padding: 0;
`

const StyledControl = styled(Form.Control)`
  margin: 10px;
  width: 210px;
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
  height: 410px;
  overflow: auto;
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
    fixed_width: {
      url: string
      width: string
      height: string
    }
  }
}

type Props = {
  onPick: () => void
  insertPosition?: number
} & typeof mapDispatchToProps

type State = {
  searchValue: string
  results?: GiphyResults
}

class GiphyPicker extends React.Component<Props, State> {
  state: State = {
    searchValue: ''
  }

  componentDidMount() {
    this.triggerSearch()
  }

  componentWillUnmount() {
    this.triggerSearch.cancel()
  }

  _search = () => {
    const { searchValue } = this.state

    const action = searchValue ? 'search' : 'trending'
    const params = {
      api_key: API_KEY,
      lang: 'en',
      rating: 'pg-13',
      q: searchValue,
      limit: 15
    }

    axios
      .get(`${ENDPOINT}${action}`, { params })
      .then((results: AxiosResponse<GiphyResults>) => {
        this.setState({ results: results.data })
      })
  }
  triggerSearch = debounce(500, this._search)

  searchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value })
    this.triggerSearch()
  }

  selectGiphy = (giphyItem: GiphyItem) => () => {
    const imageDetails = giphyItem.images.fixed_width

    const item = createImageItem({
      url: imageDetails.url,
      title: giphyItem.title,
      width: parseInt(imageDetails.width, 10),
      height: parseInt(imageDetails.height, 10)
    })

    this.props.addItem({ item, position: this.props.insertPosition })
    this.props.onPick()
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
          {items &&
            items.map(item => (
              <Giphy
                key={item.id}
                alt={item.title}
                src={item.images.fixed_width.url}
                onClick={this.selectGiphy(item)}
              />
            ))}
        </GiphyList>
      </StyledContent>
    )
  }
}

const mapDispatchToProps = { addItem }

export default connect(null, mapDispatchToProps)(GiphyPicker)
