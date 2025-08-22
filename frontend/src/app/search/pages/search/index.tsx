import { Box } from "@chakra-ui/react"
import { NavBar } from "../../../../shared/components/nav-bar"
import { SearchResult } from "../../components/search-result";


export const SearchPage = () => {
    return(
        <Box
            bg="#191919"
            color="#EAEAEA"
            minH="100vh"
            fontFamily="Inter"
            position="relative"
        >
            <NavBar />

            <SearchResult />

        </Box>
    )
}