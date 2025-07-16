"""merge branches

Revision ID: 5a00acf39bf2
Revises: c76c00dcf92f, dce97aa7aa18
Create Date: 2025-07-16 03:19:00.742787

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5a00acf39bf2'
down_revision: Union[str, Sequence[str], None] = ('c76c00dcf92f', 'dce97aa7aa18')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
