import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';

export default function NavBar() {
	const { quantidadeProduto } = useCarrinhoContext();
	return (
		<Nav>
			<Logo />
			<IconButton disabled={quantidadeProduto === 0}>
				<Badge
					overlap="rectangular"
					color="primary"
					badgeContent={quantidadeProduto}
				>
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
		</Nav>
	);
}
