// import React from 'react'

// // Ours
// import { H1, H2, Intro } from '../components/Headings'
// import Video from '../components/Video'
// import Wrapper from '../components/Wrapper'
// import { Wordmark } from '../components/Logos'

// const VideoDemo = props => {
//   const pageNode = {
//     title: 'Vimeo demo',
//   }

//   return (
//     <article>
//       <Wrapper maxWidth={3}>
//         <header className="col-12 max-width-2 center mx-auto mb4">
//           <H1>{pageNode.title}</H1>
//           <Intro>
//             Demonstrating the custom settings we have added on top of all Vimeo
//             videos.
//           </Intro>
//         </header>
//         <section className="mb4">
//           <H2>Video with default settings</H2>
//           <Video />
//         </section>
//         <section className="mb4">
//           <H2>Video with dynamic title from Vimeo</H2>
//           <p>
//             This is to show that we can pull in some of the default information
//             from the Vimeo video, if there are cases where it makes more sense
//             to have that information there rather than also recording it within
//             WordPress.
//           </p>
//           <Video showTitle />
//         </section>
//         <section className="mb4">
//           <p>
//             While it is possible to add other user interface elements, they are
//             duplications of what we already get with the default Vimeo UI (ex.
//             progress bar, current time, etc.)
//           </p>
//           <H2>Video with (still unstyled) custom progress bar</H2>
//           <Video showProgress />
//         </section>
//         <section className="mb4">
//           <H2>Video with custom ratio (19.8:9)</H2>
//           <p>
//             All videos are responsive by default, but that assumes that video is
//             16×9, which may not be the case for your videos. If they all have
//             the same aspect ratio, we can configure the videos as appropraite.
//             We can also make the darkend bars at the top and bottom transparent,
//             I have just made them visible for now while we figure that out.
//           </p>
//           <Video ratio="19.8:9" />
//         </section>
//       </Wrapper>
//       <section>
//         <H2>Responsive size demo</H2>
//         {[1, 2, 3, 4, 5].map((maxWidth, index) => {
//           return (
//             <div className="mb4" key={`VimeoDemo_${maxWidth}_${index}`}>
//               <Wrapper maxWidth={maxWidth} mx={false}>
//                 <Video />
//               </Wrapper>
//             </div>
//           )
//         })}
//       </section>
//       <footer className="center my4">
//         <Wordmark />
//       </footer>
//     </article>
//   )
// }

// VideoDemo.defaultProps = {}

// export default VideoDemo
