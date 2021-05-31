import React from "react";
/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */
import { motion } from "framer-motion";
import useInView from "@owaiswiz/use-in-view";

function AnimatedSlideInComponent({ direction = "left", offset = 30, children }) {
  const [ref, inView] = useInView(30);

  const x = { target: "0%" };

  if (direction === "left") x.initial = "-150%";
  else x.initial = "150%";

  return (
    <motion.section
      initial={{ x: x.initial }}
      animate={{ 
        x: inView && x.target,
        transitionEnd:{
          x: inView && 0
        }
      }}
      transition={{ type: "spring", damping: 19 }}
      ref={ref}
    >
      {children}
    </motion.section>
  );
}
export default AnimatedSlideInComponent;

// function AppProps(props) {
//   <StyledDiv className="App">
//     <AnimationReveal {...props} />
//   </StyledDiv>
// }
// export default AppProps;