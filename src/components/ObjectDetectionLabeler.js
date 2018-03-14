import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import countBy from 'lodash/countBy'
import concat from 'lodash/concat'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import map from 'lodash/map'
import remove from 'lodash/remove'

import { Card, CardTitle, CardActions } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import DelIcon from 'material-ui/svg-icons/action/delete'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import VisibilityIcon from 'material-ui/svg-icons/action/visibility'
import VisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off'

import { rgba, px, labelColor } from 'utils/styles'
import config from 'config/client-config'

const ORIGIN_POINT = {
  x: 0,
  y: 0,
}

const EMPTY_BBOX = [ORIGIN_POINT, ORIGIN_POINT]

const EMPTY_LABEL = {
  name: '',
  color: '',
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  > * {
    height: 100%;
  }
`

const ToolbarContainer = styled.div`
  width: 300px;

  > div {
    height: 100% !important;

    > div {
      height: 100% !important;
    }
  }
`

const DrawerContainer = styled.div`
  width: calc(100% - 300px);
  padding: 0 15px;
`

const DrawerPaper = styled(Paper)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DrawerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  > * {
    position: absolute;
  }
`

const NoFrameContent = styled.h2`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`

const ImageLoading = styled(CircularProgress)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ImageOverlay = styled.div`
  cursor: ${props => (props.candraw ? 'crosshair' : 'default')};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${props => (props.candraw ? 3 : -1)};
`

const BoundingBox = ({
  left,
  top,
  width,
  height,
  labelName,
  color,
  highlight,
  showName,
  showDelBtn,
  onMouseOver,
  onMouseLeave,
  onDelBtnClick,
}) => {
  const style = {
    left: px(left),
    top: px(top),
    width: px(width),
    height: px(height),
    backgroundColor: rgba(color, highlight ? 0.5 : 0.1),
    transition: 'background-color linear 0.2s',
    border: `3px ${highlight ? 'solid' : 'dotted'} ${color}`,
    cursor: 'pointer',
    zIndex: highlight ? 2 : 1,
  }
  const delIconStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    color: '#FFF',
  }
  const nameStyle = {
    position: 'absolute',
    top: '5px',
    left: '5px',
    color: '#FFF',
  }

  return (
    <div style={style} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      {showDelBtn && <DelIcon style={delIconStyle} onClick={onDelBtnClick} />}
      {showName && <div style={nameStyle}>{labelName}</div>}
    </div>
  )
}

const LabelListWrapper = styled.div`
  display: flex;
  height: calc(100% - 130px);
  overflow: auto;
`

const ToolbarActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`

class ObjectDetectionLabeler extends React.Component {
  static propTypes = {
    isLoadingFrame: PropTypes.bool.isRequired,
    isSavingFrame: PropTypes.bool.isRequired,
    frame: PropTypes.object.isRequired,
    hasNextFrame: PropTypes.bool.isRequired,
    labelList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    getFrame: PropTypes.func.isRequired,
    updateFrame: PropTypes.func.isRequired,
    saveFrame: PropTypes.func.isRequired,
    setLabelVisibility: PropTypes.func.isRequired,
  }

  state = {
    imgLoaded: false,
    imgInfo: {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    },
    isDrawing: false,
    drawingInfo: {
      fixedPoint: ORIGIN_POINT,
      bbox: EMPTY_BBOX,
    },
    selectedBBoxIdx: -1,
    selectedLabel: EMPTY_LABEL,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize = () => {
    if (this.state.imgLoaded) {
      const imgInfo = this.calculateImageInfo()

      this.setState({
        imgInfo,
      })
    }
  }

  handleImageLoad = () => {
    const imgInfo = this.calculateImageInfo()

    this.setState({
      imgLoaded: true,
      imgInfo,
    })
  }

  handleImageMouseDown = e => {
    if (this.canDraw() && !this.state.isDrawing) {
      const { x, y } = this.getImageMousePosition(e)
      const point = {
        x,
        y,
      }

      this.setState({
        isDrawing: true,
        drawingInfo: {
          fixedPoint: point,
          bbox: [point, point],
        },
      })
    }
  }

  handleImageMouseMove = e => {
    if (this.canDraw() && this.state.isDrawing) {
      const { fixedPoint } = this.state.drawingInfo
      const { x, y } = this.getImageMousePosition(e)
      const xmin = Math.min(x, fixedPoint.x)
      const ymin = Math.min(y, fixedPoint.y)
      const xmax = Math.max(x, fixedPoint.x)
      const ymax = Math.max(y, fixedPoint.y)

      this.setState({
        drawingInfo: {
          ...this.state.drawingInfo,
          bbox: [
            {
              x: xmin,
              y: ymin,
            },
            {
              x: xmax,
              y: ymax,
            },
          ],
        },
      })
    }
  }

  handleImageMouseUp = e => {
    if (this.canDraw() && this.state.isDrawing) {
      const { frame } = this.props
      const { drawingInfo, selectedLabel } = this.state

      const { labels } = frame
      const newLabels = concat(labels, {
        label: selectedLabel.name,
        bbox: this.deserializeBBox(drawingInfo.bbox),
      })

      this.updateFrame(newLabels)

      this.setState({
        isDrawing: false,
        drawingInfo: {
          fixedPoint: ORIGIN_POINT,
          bbox: EMPTY_BBOX,
        },
        selectedLabel: EMPTY_LABEL,
      })
    }
  }

  handleImageDragStart = e => {
    e.preventDefault()
  }

  handleBBoxMouseEnter = idx => {
    this.setState({
      selectedBBoxIdx: idx,
    })
  }

  handleBBoxMouseLeave = () => {
    this.setState({
      selectedBBoxIdx: -1,
    })
  }

  handleBBoxDelBtnClick = idx => {
    const { labels } = this.props.frame

    const newLabels = remove(labels, (x, xIdx) => idx !== xIdx)

    this.updateFrame(newLabels)

    this.setState({
      selectedBBoxIdx: -1,
    })
  }

  handleVisibilityIconClick = (labelName, visible) => {
    this.props.setLabelVisibility({
      labelName,
      visible,
    })
  }

  handleLabelClick = (labelName, color) => {
    const selectedLabel = labelName === this.state.selectedLabel.name ? EMPTY_LABEL : { name: labelName, color }

    this.setState({
      selectedLabel,
    })
  }

  handleSaveBtnClick = () => {
    const { id, labels } = this.props.frame

    this.props.saveFrame({
      frameId: id,
      labels,
    })
  }

  canDraw = () => this.state.imgLoaded && this.state.selectedLabel.name

  calculateImageInfo = () => {
    const imgRect = this.img.getBoundingClientRect()
    const wrapperRect = this.drawerWrapper.getBoundingClientRect()

    return {
      x: imgRect.x - wrapperRect.x,
      y: imgRect.y - wrapperRect.y,
      width: imgRect.width,
      height: imgRect.height,
    }
  }

  getImageMousePosition = e => {
    const imgRect = this.img.getBoundingClientRect()
    const x = e.clientX - imgRect.x
    const y = e.clientY - imgRect.y
    const { width, height } = imgRect

    return {
      x: x > width ? 1 : x / width,
      y: y > height ? 1 : y / height,
    }
  }

  deserializeBBox = bbox => [bbox[0].x, bbox[0].y, bbox[1].x, bbox[1].y]

  serializeBBox = bbox => [
    {
      x: bbox[0],
      y: bbox[1],
    },
    {
      x: bbox[2],
      y: bbox[3],
    },
  ]

  updateFrame = labels => {
    this.props.updateFrame({ labels })
  }

  renderToolbar() {
    const { selectedLabel } = this.state
    const { isLoadingFrame, isSavingFrame, labelList, frame, hasNextFrame } = this.props

    const colors = map(labelList, (label, idx) => labelColor(idx))
    const visibilities = map(labelList, (label, idx) => {
      const Icon = label.visible ? VisibilityIcon : VisibilityOffIcon
      const color = colors[idx]

      return (
        <MenuItem
          key={label.name}
          rightIcon={<Icon style={{ right: '20px' }} color={color} />}
          onClick={this.handleVisibilityIconClick.bind(this, label.name, !label.visible)}
        />
      )
    })

    const { labels } = frame
    const labelItems = map(labelList, (label, idx) => {
      const color = colors[idx]
      const style =
        label.name !== selectedLabel.name
          ? {}
          : {
              backgroundColor: color,
              color: '#FFF',
            }
      const count = countBy(labels, ({ label: labelName }) => labelName === label.name).true
      const text = `${label.name} (${count ? count : 0})`

      return (
        <MenuItem
          key={label.name}
          primaryText={text}
          style={style}
          onClick={this.handleLabelClick.bind(this, label.name, color)}
        />
      )
    })

    const saveBtnDisabled = isLoadingFrame || !hasNextFrame || isSavingFrame

    return (
      <ToolbarContainer>
        <Card style={{ height: '100%' }}>
          <CardTitle title="Select a label below" />
          <LabelListWrapper>
            <Menu style={{ width: '84px' }}>{visibilities}</Menu>
            <Menu style={{ width: '216px' }}>{labelItems}</Menu>
          </LabelListWrapper>
          <ToolbarActions>
            <RaisedButton label="Save" primary={true} disabled={saveBtnDisabled} onClick={this.handleSaveBtnClick} />
          </ToolbarActions>
        </Card>
      </ToolbarContainer>
    )
  }

  renderBoundingBox({ bbox, labelName, color, highlight, showName, showDelBtn, key = '', idx = -1 }) {
    const { imgInfo } = this.state

    return (
      <BoundingBox
        key={key}
        left={imgInfo.x + imgInfo.width * bbox[0].x}
        top={imgInfo.y + imgInfo.height * bbox[0].y}
        width={imgInfo.width * (bbox[1].x - bbox[0].x)}
        height={imgInfo.height * (bbox[1].y - bbox[0].y)}
        labelName={labelName}
        color={color}
        highlight={highlight}
        showName={showName}
        showDelBtn={showDelBtn}
        onMouseOver={this.handleBBoxMouseEnter.bind(this, idx)}
        onMouseLeave={this.handleBBoxMouseLeave}
        onDelBtnClick={this.handleBBoxDelBtnClick.bind(this, idx)}
      />
    )
  }

  renderDrawer() {
    const { imgLoaded, imgInfo, isDrawing, drawingInfo, selectedBBoxIdx, selectedLabel } = this.state
    const { isLoadingFrame, frame, hasNextFrame, labelList } = this.props
    const { uri, labels } = frame
    const image = `${config.storeRoot}/${uri}`

    const drawingBoundingBox = this.renderBoundingBox({
      bbox: drawingInfo.bbox,
      labelName: selectedLabel.name,
      color: selectedLabel.color,
      highlight: true,
      showName: false,
      showDelBtn: false,
    })
    const boundingBoxes = map(labels, ({ label: labelName, bbox }, idx) => {
      const { visible } = find(labelList, { name: labelName })

      if (!visible) {
        return null
      } else {
        const colorIdx = findIndex(labelList, { name: labelName })
        const color = labelColor(colorIdx)
        const serializedBBox = this.serializeBBox(bbox)
        const selected = idx === selectedBBoxIdx

        return this.renderBoundingBox({
          bbox: serializedBBox,
          labelName,
          color,
          highlight: selected,
          showName: selected,
          showDelBtn: selected,
          key: `${labelName}${bbox}`,
          idx,
        })
      }
    })
    const imageOverlayStyle = {
      width: imgInfo.width,
      height: imgInfo.height,
    }

    const drawerContent = !hasNextFrame ? (
      <DrawerWrapper innerRef={drawerWrapper => (this.drawerWrapper = drawerWrapper)}>
        <NoFrameContent>All frames all labeled :)</NoFrameContent>
      </DrawerWrapper>
    ) : (
      <DrawerWrapper innerRef={drawerWrapper => (this.drawerWrapper = drawerWrapper)}>
        {uri && (
          <Image
            innerRef={img => (this.img = img)}
            src={image}
            alt={image}
            onLoad={this.handleImageLoad}
            onDragStart={this.handleImageDragStart}
          />
        )}
        {(!imgLoaded || isLoadingFrame) && <ImageLoading size={100} thickness={3} />}
        {boundingBoxes}
        {isDrawing && drawingBoundingBox}
        {this.canDraw() && (
          <ImageOverlay
            style={imageOverlayStyle}
            candraw={this.canDraw()}
            onMouseDown={this.handleImageMouseDown}
            onMouseMove={this.handleImageMouseMove}
            onMouseUp={this.handleImageMouseUp}
            onMouseLeave={this.handleImageMouseUp}
          />
        )}
      </DrawerWrapper>
    )

    return (
      <DrawerContainer>
        <DrawerPaper innerRef={drawerPaper => (this.drawerPaper = drawerPaper)}>{drawerContent}</DrawerPaper>
      </DrawerContainer>
    )
  }

  render() {
    return (
      <Container>
        {this.renderDrawer()}
        {this.renderToolbar()}
      </Container>
    )
  }
}

export default ObjectDetectionLabeler
