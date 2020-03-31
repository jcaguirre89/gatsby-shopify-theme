export function buildImageObj(source) {
  import sanityConfig from '../../../studio/sanity.json';
  import imageUrlBuilder from '@sanity/image-url';

  export const builder = imageUrlBuilder(sanityConfig.api);

  export function imageUrlFor(source) {
    return builder.image(source);
  }

  export const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}
