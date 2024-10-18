import { Box, Grid2, Typography } from '@mui/material'
import React from 'react'

import styles from "./TextCard.module.css"
const TextCards = () => {
  return (
 <>
       
       <Grid2 container spacing={2}>

            <Grid2 size={{xs:12, md:6,lg:6}} className={styles.text_card}>
                <Typography component={"h4"}>
                    Hi, What is the weather
                </Typography>

                <Typography component={"p"}>
                Get immediate AI generated response
                </Typography>

            </Grid2>

            <Grid2 size={{xs:12, md:6,lg:6}} className={styles.text_card}>
                <Typography component={"h4"}>
                    Hi, What is the weather
                </Typography>

                <Typography component={"p"}>
                Get immediate AI generated response
                </Typography>

            </Grid2>

            <Grid2 size={{xs:12, md:6,lg:6}} className={styles.text_card}>
                <Typography component={"h4"}>
                    Hi, What is the weather
                </Typography>

                <Typography component={"p"}>
                Get immediate AI generated response
                </Typography>

            </Grid2>

            <Grid2 size={{xs:12, md:6,lg:6}} className={styles.text_card}>
                <Typography component={"h4"}>
                    Hi, What is the weather
                </Typography>

                <Typography component={"p"}>
                Get immediate AI generated response
                </Typography>

            </Grid2>
       
       </Grid2>

    </>
  )
}

export default TextCards