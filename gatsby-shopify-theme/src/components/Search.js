import React, { useState } from 'react';
import { Index } from 'elasticlunr';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  ul {
    position: absolute;
    width: 100%;
    top: 58px;
    right: 0px;
    border: 1px solid red;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0;
    margin: 0;
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
  const [toggleInput, setToggleInput] = useState(false);
  let index;
  console.log(results);

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
    <Wrapper>
      <button type="button" onClick={() => setToggleInput(!toggleInput)}>
        <MdSearch />
      </button>
      <input
        type="text"
        name="search"
        value={query}
        onChange={e => search(e)}
      />
      <ul>
        {results.map(result => (
          <Link to={`/store/${result.handle}`}>
            <li key={result.handle}>{result.title}</li>
          </Link>
        ))}
      </ul>
    </Wrapper>
  );
}
