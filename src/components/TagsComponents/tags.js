import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

const Tag = styled.div`
    font-weight: bolder;
    display: inline-block;
    background-color: #0073D7;
    color: white;
    padding: 2px 8px;
    margin-right: 10px;
    margin-bottom: 10px;
    transform: skew(-10deg);
    vertical-align: middle;

    &:hover {
        cursor: pointer;
    }

    span {
        font-family: "Comfortaa", cursive;
        font-size: 12px;
        font-weight: bold;
        transform: skew(10deg);
        user-select: none;
        text-align: center;
    }
`

const Tags = props => {
    const { tag } = props

    const handleClick = () => {
        const nav = `/${tag}`
        navigate(nav)
    }

    return (
        <Tag onClick={handleClick}>
            <span>{tag}</span>
        </Tag>
    )
}

export default Tags
