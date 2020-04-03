import React, { useEffect, useState, useContext, useRef } from 'react';
import { Index } from 'elasticlunr';
import { graphql, useStaticQuery, Link } from 'gatsby';
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
  grid-template-rows: 100px 1fr;
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
    list-style: none;
    padding: 0 20px;
    margin: 0;
  }

  li {
    padding: 0;
    margin: 0;
    color: black;
  }
`;

const SearchInput = styled.input`
  width: 90%;
  margin: auto;
  padding: 15px;
  height: 40px;
  display: block;
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background-repeat: no-repeat;
  color: ${props => props.theme.colors.offBlack};

  &:focus,
  &:valid {
    box-shadow: none;
    outline: none;
    background-position: 0 0;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
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
      <SearchInput
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
              <ResultContainer>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </ResultContainer>
            </li>
          </Link>
        ))}
      </ul>
    </SideBar>
  );
}
