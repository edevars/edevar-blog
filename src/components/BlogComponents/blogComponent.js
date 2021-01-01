import React, { Component } from "react"
import styled from "styled-components"
import GridPosts from "../PostComponents/gridposts"
import CategoriesList from "../PostComponents/CategoriesList"

import sync from '../../images/icons/sync.png'

const Button = styled.button`
    display: ${props => (props.visibility === "true" ? "flex" : "none")};
    width: 40%;
    padding: 20px 0px;
    margin: 60px auto 0px;
    background: #060695;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 30px;
    justify-content: center;
    border: none;
    outline: 0;

    &:hover {
        cursor: pointer;
    }

    .Icon {
        align-self: center;
        margin-left: 20px;
        display: inline-block;
        width: 28px;
    }

    @media screen and (max-width: 768px) {
        width: 80%;
    }

    @media screen and (max-width: 425px) {
        width: 90%;
        font-size: 1.2rem;
    }
`

class BlogComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                allMarkdownRemark: {
                    nodes: [],
                },
            },
            start: 0,
            end: 6,
            visibilityButton: "true",
            limit: 6,
        }
    }

    componentDidMount() {
        this.renderPosts()
        if (this.props.data.allMarkdownRemark.nodes.length <= this.state.limit) {
            this.setState({
                visibilityButton: "false",
            })
        }
    }

    addPosts = () => {
        let difference =
            this.props.data.allMarkdownRemark.nodes.length - this.state.end

        if (difference > this.state.limit) {
            this.setState({
                start: this.state.end,
                end: this.state.end + this.state.limit,
            })
        } else {
            this.setState({
                start: this.state.end,
                end: this.state.end + difference,
            })
        }

        let posts = {
            allMarkdownRemark: {
                nodes: [].concat(
                    this.state.data.allMarkdownRemark.nodes,
                    this.props.data.allMarkdownRemark.nodes.slice(
                        this.state.start,
                        this.state.end
                    )
                ),
            },
        }

        this.setState({
            loading: false,
            data: posts,
        })
    }

    renderPosts = () => {
        this.setState({
            loading: true,
        })

        try {
            this.addPosts()
            if (
                this.props.data.allMarkdownRemark.nodes.length ===
                this.state.end
            ) {
                this.setState({
                    visibilityButton: "false",
                    loading: false,
                })
            }
        } catch (error) {
            this.setState({
                loading: false,
                error,
            })
        }
    }

    render() {
        return (
            <>
                <CategoriesList />
                <GridPosts data={this.state.data} />

                <Button
                    onClick={() => {
                        this.renderPosts()
                    }}
                    visibility={this.state.visibilityButton}
                >
                    Ver más posts
                    <img src={sync} alt="sync icon" className="Icon"/>
                </Button>
            </>
        )
    }
}

export default BlogComponent
