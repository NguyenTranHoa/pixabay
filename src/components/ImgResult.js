import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GridList, GridTile, IconButton, Dialog } from 'material-ui';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';

export default class ImgResult extends Component {
    state = {
        open: false,
        imgZoom: ''
    }

    handleOpen = img => {
        this.setState({
            open: true,
            imgZoom: img
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }
    
    render() {
        const { images, loading } = this.props;
        console.log(images)
        return (
            <div>
                <GridList cols={3}>
                    { images.map(img => (
                        
                        <GridTile
                            title={img.tags}
                            key={img.id}
                            subtitle={<span>by <strong>{img.user}</strong></span>}
                            actionIcon={
                                <IconButton onClick={() => this.handleOpen(img.largeImageURL)} >
                                    <ZoomIn color="white"/>
                                </IconButton>
                            }
                        >  
                            { loading ? <div>Loading</div> : <img src={img.largeImageURL} alt="" /> }
                            
                        </GridTile>
                        
                    )) }
                </GridList>
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    <img src={this.state.imgZoom} alt="" style={{ width: '100%' }} />
                </Dialog>
            </div>
        )
    }
}

ImgResult.propTypes = {
    images: PropTypes.array.isRequired
}