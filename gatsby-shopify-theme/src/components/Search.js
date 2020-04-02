import React, { useState } from 'react';
import { Index } from 'elasticlunr';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { MdSearch } from 'react-icons/md';

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
    <div>
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
        {results.map(page => (
          <li key={page.id}>
            <Link to={`/${page.path}`}>
              <p>{page.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}