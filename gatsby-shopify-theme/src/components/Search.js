import React, { useEffect, useState, useContext, useRef } from 'react';
import { Index } from 'elasticlunr';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import styled from 'styled-components';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';

const SideBar = styled.div`
  position: fixed;
  top: 90px;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px 100px 1fr;
  min-width: 300px;
  max-width: 400px;
  width: 40%;
  height: 85%;
  transition: all 0.3s;
  background: ${props => props.theme.colors.background};
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  ${props => props.open && `transform: translateX(0);`};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-width: auto;
    width: 100%;
  }
  ul {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    list-style: none;
    padding: 0 20px;
    margin: 0;

    h3 {
      margin: 0;
      margin-bottom: 5px;
    }
    p {
      margin: 0;
    }
  }

  li {
    padding: 0;
    margin-bottom: 10px;
    color: black;
  }

  .close-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    border: none;
    cursor: pointer;
  }
  input {
    width: 90%;
    font-size: 2rem;
    margin: auto;
    padding: 15px;
    height: 50px;
    display: block;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.offBlack};
    color: ${props => props.theme.colors.offBlack};
  }

  input:focus {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
  }

  .results {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export default function Search() {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { isSearchOpen } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  let index;

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const getOrCreateIndex = () =>
    index || Index.load(data.siteSearchIndex.index);

  const search = e => {
    const q = e.target.value;
    index = getOrCreateIndex();
    setQuery(q);
    setResults(
      index
        .search(q, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref))
    );
  };
  return (
    <SideBar open={isSearchOpen}>
      <button
        className="close-button"
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      >
        <FaLongArrowAltLeft size={30} />
      </button>
      <input
        type="text"
        name="search"
        value={query}
        ref={inputRef}
        placeholder="Search products"
        onChange={e => search(e)}
      />
      <ul>
        {results.map(result => (
          <Link
            to={`/store/${result.handle}`}
            onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
          >
            <li key={result.handle}>
              <div className="results">
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </SideBar>
  );
}
