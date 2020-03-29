function useElementSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return { measuredRef, height, width };
}
